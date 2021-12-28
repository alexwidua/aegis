import { useState, useEffect, useCallback, useRef } from 'react'
import useStateRef from 'react-usestateref'
import styled from 'styled-components'

import useKeyPress from './hooks/useKeyPress'
import './App.css'
import buildings from './assets/buildings'

import { currentTimeInSeconds, getActionsPerMinute } from './utils/time'
import { getAccuracy } from './utils/math'

import Prompt from './components/Prompt'
import Score from './components/Score'
import Result from './components/Result'

import SegmentedControls from './components/ui/SegmentedInput'

import useStore from './store/store'

const App = () => {
	// Game states
	const [isRunning, setIsRunning] = useState(false)

	const [score, setScore] = useState(0)
	const [scoreLimit, setScoreLimit] = useState(3)
	const [showKeyLabels, setShowKeyLabels] = useState(false)

	const [startTime, setStartTime] = useState(0)

	const [currentPrompt, setCurrentPrompt] = useState(buildings[0])
	const [inputState, setInputState] = useState('AWAIT_INPUT')
	const [numWrongInputs, setNumWrongInputs] = useState(0)

	const [result, setResult] = useState({ buildings: 0, apm: 0, accuracy: 0 })

	// Handle game end
	useEffect(() => {
		if (score == scoreLimit) {
			setIsRunning(false)
			evaluateGame()
		}
	}, [score, scoreLimit])

	// Handle input states
	useEffect(() => {
		let interval

		const resetPrompt = () => {
			setInputState('AWAIT_INPUT')
			setCurrentPrompt(
				buildings[Math.floor(Math.random() * buildings.length)]
			)
		}

		if (inputState === 'FAILED_INPUT') {
			interval = setInterval(() => setInputState('AWAIT_INPUT'), 1000)
		} else if (inputState === '2/2') {
			setScore((prev) => prev + 1)
			interval = setInterval(() => resetPrompt(), 1000)
		}
		return () => clearInterval(interval)
	}, [inputState])

	// handle keypress logic
	useKeyPress((key) => {
		if (!isRunning || inputState === 'FAILED_INPUT') return
		if (!startTime) {
			setStartTime(currentTimeInSeconds())
		}

		if (inputState === 'AWAIT_INPUT') {
			if (key === currentPrompt.hotkeys[0]) {
				setInputState('1/2')
			} else {
				setInputState('FAILED_INPUT')
				setNumWrongInputs((prev) => prev + 1)
			}
		} else if (inputState === '1/2') {
			if (key === currentPrompt.hotkeys[1]) {
				setInputState('2/2')
			} else {
				setInputState('FAILED_INPUT')
				setNumWrongInputs((prev) => prev + 1)
			}
		}
	})

	const initializeGame = () => {
		setScore(0)
		setNumWrongInputs(0)
		setStartTime(0)
		setIsRunning(true)
	}

	const evaluateGame = () => {
		const finishTime = currentTimeInSeconds()

		const buildings = scoreLimit
		const apm =
			Math.round(
				getActionsPerMinute(finishTime - startTime, scoreLimit) * 100
			) / 100
		console.log(apm)
		const accuracy = getAccuracy(numWrongInputs, scoreLimit * 2)
		const result = { buildings, apm, accuracy }
		setResult(result)
	}

	return (
		<Wrapper scored={inputState === '2/2'}>
			<Container>
				{isRunning && (
					<>
						<Score current={score} limit={scoreLimit} />
						<Prompt
							currentPrompt={currentPrompt}
							inputState={inputState}
						/>
					</>
				)}

				{/*!isRunning && <Result result={result} />*/}

				{!isRunning && (
					<button onClick={() => initializeGame()}>Play</button>
				)}

				{!isRunning && (
					<Options>
						<h2>Options</h2>
						<OptionItem>
							<OptionLabel>Number of buildings</OptionLabel>
							<SegmentedControls
								name={`buildings`}
								value={scoreLimit}
								onValueChange={(value) => setScoreLimit(value)}
								options={[
									{ value: 3 },
									{ value: 6 },
									{ value: 9 }
								]}
							/>
						</OptionItem>
						<OptionItem>
							<OptionLabel>Show labels on buttons</OptionLabel>
							<SegmentedControls
								name={`show-labels`}
								value={showKeyLabels}
								onValueChange={(value) =>
									setShowKeyLabels(value)
								}
								options={[
									{ children: 'Show', value: true },
									{ children: 'Hide', value: false }
								]}
							/>
						</OptionItem>
					</Options>
				)}
			</Container>
		</Wrapper>
	)
}

const Wrapper = styled.div.attrs((props) => ({
	style: {
		backgroundColor: props.scored ? 'green' : 'transparent'
	}
}))`
	min-height: 100vh;
	display: flex;
	align-items: center;
	transition: background-color 0.2s;
`

const Container = styled.div`
	max-width: 800px;
	margin: 0 auto;
	display: flex;
	justify-content: center;
	flex-direction: column;
`

const Options = styled.div`
	font-size: 0.75rem;
	padding: 2rem 0 0 0;

	& h2 {
		font-size: 1rem;
	}
`

const OptionItem = styled.div`
	display: flex;
	flex-direction: column;
	padding: 0.5rem 0;
	font-family: var(--mono-font);
`

const OptionLabel = styled.span`
	padding: 0.5rem 0 0.75rem 0;
`

export default App
