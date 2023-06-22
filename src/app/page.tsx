'use client';
import {
	SandpackProvider,
	SandpackLayout,
	SandpackCodeEditor,
	SandpackFileExplorer,
	SandpackPreview,
} from '@codesandbox/sandpack-react';
import { autocompletion, completionKeymap } from '@codemirror/autocomplete';
import {
	cyberpunk,
	amethyst,
	nightOwl,
	freeCodeCampDark,
} from '@codesandbox/sandpack-themes';

export default async function Home() {
	return (
		<div className="flex min-h-full flex-col py-12 sm:px-6 lg:px-8">
			<SandpackProvider template="react" theme={amethyst}>
				<SandpackLayout>
					<SandpackFileExplorer />
					<SandpackCodeEditor
						showLineNumbers={true}
						showInlineErrors
						wrapContent
						extensions={[autocompletion()]}
						//@ts-ignore
						extensionsKeymap={[completionKeymap]}
					/>
					<div className="sm:mx-auto sm:w-full sm:max-w-md">
						<p className="font-bold text-white">hello</p>
					</div>
				</SandpackLayout>
			</SandpackProvider>
		</div>
	);
}
