import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
	ConfigProvider,
	Button,
	Checkbox,
	Form,
	Radio,
	Slider,
	theme,
} from 'antd';
import { HappyProvider } from '@ant-design/happy-work-theme';
import {
	generateLoremIpsum,
	getRandomLyricFromRandomAlbum,
} from './redux/ipsum';
import lyrics from './data/lyrics';
import './App.css';

const albumOptions = [
	{ label: 'Dangerously in Love', value: 'dangerouslyInLove' },
	{ label: "B'Day", value: 'bDay' },
	{ label: 'I Am… Sasha Fierce', value: 'iAmSashaFierce' },
	{ label: '4', value: 'four' },
	{ label: 'Beyoncé', value: 'beyonce' },
	{ label: 'Lemonade', value: 'lemonade' },
	{ label: 'EVERYTHING IS LOVE', value: 'everythingIsLove' },
	{ label: 'The Gift', value: 'theGift' },
	{ label: 'Renaissance', value: 'renaissance' },
	{ label: 'Features', value: 'features' },
];
const defaultAlbumOptions = albumOptions.map((album) => album.value);

let title = 'To the left, to the left!';

const App = () => {
	const [paragraphs, setParagraphs] = useState(3);
	const [paragraphLength, setParagraphLength] = useState('medium');
	const [includeSlay, setIncludeSlay] = useState(false);
	const [includeExplicit, setIncludeExplicit] = useState(false);
	const [selectedAlbums, setSelectedAlbums] = useState(defaultAlbumOptions);
	const [includeGreeting, setIncludeGreeting] = useState(false);
	const [checkAll, setCheckAll] = useState(
		albumOptions.length === selectedAlbums.length,
	);

	const indeterminate =
		selectedAlbums.length > 0 &&
		selectedAlbums.length < albumOptions.length;

	const dispatch = useDispatch();
	const loremIpsumText = useSelector((state) => state.loremIpsum.text);

	// State to track whether the text has been copied to clipboard
	const [copied, setCopied] = useState(false);

	// Function to handle copying text to clipboard using Clipboard API
	const handleCopyToClipboard = () => {
		const textToCopy = loremIpsumText;

		if (navigator.clipboard) {
			// Use the Clipboard API if available
			navigator.clipboard
				.writeText(textToCopy)
				.then(() => {
					// Text successfully copied
					setCopied(true);

					// Reset copied state after 3 seconds
					setTimeout(() => {
						setCopied(false);
					}, 3000);
				})
				.catch((error) => {
					console.error('Error copying to clipboard:', error);
				});
		} else {
			// Clipboard API not supported, display an error message
			console.error('Clipboard API is not supported in this browser.');
		}
	};

	const handleGenerateIpsum = () => {
		title = getRandomLyricFromRandomAlbum(lyrics);

		dispatch(
			generateLoremIpsum({
				paragraphs,
				paragraphLength,
				includeSlay,
				includeExplicit,
				includeGreeting,
				selectedAlbums,
			}),
		);
	};

	const onCheckAllChange = (e) => {
		setSelectedAlbums(e.target.checked ? defaultAlbumOptions : []);
		setCheckAll(e.target.checked);
	};

	const handleAlbumSelection = (values) => {
		setSelectedAlbums(values);
		setCheckAll(values.length === defaultAlbumOptions.length);
	};

	useEffect(() => {
		document.title = 'Beyoncé Ipsum';
		// Generate Lorem Ipsum text on component load
		dispatch(
			generateLoremIpsum({
				paragraphs,
				paragraphLength,
				includeSlay,
				includeExplicit,
				selectedAlbums,
			}),
		);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []); // Empty dependency array ensures this effect runs once on component load

	return (
		<ConfigProvider
			theme={{
				algorithm: theme.darkAlgorithm,
				token: {
					colorPrimary: 'white', //'deeppink',
					borderRadius: 0,
					fontFamily: 'DM Mono',
					fontSize: 16,
					colorText: 'white',
				},
				components: {
					Button: {
						algorithm: true,
						// colorPrimary: 'black',
					},
					Slider: {
						trackBg: 'white',
						trackHoverBg: 'white',
						handleColor: 'white', //'deeppink',
						handleActiveColor: 'white', //'deeppink',
						colorBgElevated: 'white', //'deeppink',
					},
					Radio: {
						buttonCheckedBg: 'white', //'deeppink',
						buttonSolidCheckedColor: 'black',
					},
					Checkbox: {
						algorithm: true,
						colorPrimary: 'black',
						// colorBorder: 'white',
					},
				},
			}}
		>
			<div className="app">
				<div className="container">
					<header className="header">
						<p className="header__title">Beyoncé Ipsum</p>
					</header>
					<main className="main">
						<h1 className="main__title">{title}</h1>
						<Form
							className="form"
							layout="vertical"
							autoComplete="off"
						>
							<Form.Item
								name="radio-button"
								label="# of Paragraphs"
							>
								<div className="slider__label">
									<Slider
										min={1}
										max={6}
										step={1}
										defaultValue={3}
										tooltip={{ open: true }}
										onChange={(e) => setParagraphs(e)}
									/>
								</div>
							</Form.Item>
							<Form.Item
								name="radio-button"
								label="Paragraph Length"
							>
								<Radio.Group
									onChange={(e) =>
										setParagraphLength(e.target.value)
									}
									value={paragraphLength}
									defaultValue="medium"
									buttonStyle="solid"
								>
									<Radio.Button value="short">
										Short
									</Radio.Button>
									<Radio.Button value="medium">
										Medium
									</Radio.Button>
									<Radio.Button value="long">
										Long
									</Radio.Button>
								</Radio.Group>
							</Form.Item>
							<Form.Item
								name="checkbox-group"
								label="Which Albums?"
							>
								<Checkbox.Group
									options={albumOptions}
									value={selectedAlbums}
									onChange={handleAlbumSelection}
								/>
								<Checkbox
									indeterminate={indeterminate}
									onChange={onCheckAllChange}
									checked={checkAll}
								>
									Check all
								</Checkbox>
							</Form.Item>
							<Form.Item>
								<Checkbox
									checked={includeSlay}
									onChange={(e) =>
										setIncludeSlay(e.target.checked)
									}
								>
									Slay 💃🏾💃🏾💃🏾
								</Checkbox>
								<br />
								<Checkbox
									checked={includeExplicit}
									onChange={(e) =>
										setIncludeExplicit(e.target.checked)
									}
								>
									Include Explicit Lyrics
								</Checkbox>
								<br />
								<Checkbox
									checked={includeGreeting}
									onChange={(e) =>
										setIncludeGreeting(e.target.checked)
									}
								>
									Start with "Hey, Ms. Carter!"
								</Checkbox>
							</Form.Item>
							<HappyProvider>
								<Button
									type="primary"
									ghost
									onClick={handleGenerateIpsum}
								>
									Generate
								</Button>
							</HappyProvider>
						</Form>
						<section className="generated">
							<div
								dangerouslySetInnerHTML={{
									__html: loremIpsumText,
								}}
							/>
							<div className="copy">
								<Button
									type="primary"
									ghost
									onClick={handleCopyToClipboard}
								>
									Copy
									<svg
										fill="white"
										version="1.1"
										xmlns="http://www.w3.org/2000/svg"
										x="0px"
										y="0px"
										viewBox="0 0 368.008 368.008"
										width={16}
									>
										<path
											d="M368,88.004c0-1.032-0.224-2.04-0.6-2.976c-0.152-0.376-0.416-0.664-0.624-1.016c-0.272-0.456-0.472-0.952-0.832-1.352
										l-72.008-80c-1.512-1.688-3.672-2.656-5.944-2.656h-15.648c-0.232,0-0.472,0-0.704,0H151.992c-13.232,0-24,10.768-24,24v40H24
										c-13.232,0-24,10.768-24,24v256c0,13.232,10.768,24,24,24h192c13.232,0,24-10.768,24-24v-40h104c13.232,0,24-10.768,24-24v-175.96
										c0-0.016,0.008-0.024,0.008-0.04L368,88.004z M224,344.004c0,4.408-3.592,8-8,8H24c-4.408,0-8-3.592-8-8v-256c0-4.408,3.592-8,8-8
										h104v88c0,4.416,3.584,8,8,8h88V344.004z M224,160.004h-80v-80h4.688L224,155.324V160.004z M352,280.004c0,4.416-3.592,8-8,8H240
										v-119.64c0-0.12,0.008-0.24,0.008-0.36l-0.008-16c0,0,0-0.008,0-0.024c-0.008-2.12-0.832-4.04-2.184-5.464
										c0-0.016-0.024-0.016-0.016-0.016c0,0-0.008-0.008-0.008-0.016c-0.008,0-0.016-0.008-0.016-0.016
										c-0.032-0.032-0.072-0.072-0.112-0.112l-80-80c-1.504-1.504-3.544-2.352-5.664-2.352h-8.008v-40c0-4.408,3.592-8,8-8h112v88
										c0,4.416,3.584,8,8,8H352V280.004z M352,96.004h-72.008v-80h4.44L352,91.076V96.004z"
										></path>
									</svg>
								</Button>
								{copied && (
									<span className="copied">
										Copied to clipboard!
									</span>
								)}
							</div>
						</section>
					</main>
				</div>
				<div className="container">
					<footer className="footer">
						<p className="footer__note">
							Made by{' '}
							<a
								className="footer__link"
								href="https://mina.codes"
							>
								Mina
							</a>{' '}
							• Not affliated with Parkwood Entertainment
						</p>
					</footer>
				</div>
			</div>
		</ConfigProvider>
	);
};

export default App;
