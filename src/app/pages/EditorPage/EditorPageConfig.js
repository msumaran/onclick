import i18next from 'i18next';
import EditorPage from './EditorPage';

const editorPageConfig = {
	settings: {
		layout: {
			config: {}
		}
	},
	routes: [
		{
			path: '/editor',
			component: EditorPage
		}
	]
};

export default editorPageConfig;
