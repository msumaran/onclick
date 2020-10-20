const prodConfig = {
	apiKey: "AIzaSyD-wxmd_OmfUqPwjHEDTGR9x9pBsl0FizI",
    authDomain: "crmnativos-863ab.firebaseapp.com",
    databaseURL: "https://crmnativos-863ab.firebaseio.com",
    projectId: "crmnativos-863ab",
    storageBucket: "crmnativos-863ab.appspot.com",
    messagingSenderId: "466159933820",
    appId: "1:466159933820:web:56f51ae2decc68fcd9ecf9",
    measurementId: "G-6296QH8ZC7"
};

const devConfig = {
	apiKey: "AIzaSyD-wxmd_OmfUqPwjHEDTGR9x9pBsl0FizI",
    authDomain: "crmnativos-863ab.firebaseapp.com",
    databaseURL: "https://crmnativos-863ab.firebaseio.com",
    projectId: "crmnativos-863ab",
    storageBucket: "crmnativos-863ab.appspot.com",
    messagingSenderId: "466159933820",
    appId: "1:466159933820:web:56f51ae2decc68fcd9ecf9",
    measurementId: "G-6296QH8ZC7"
};

const config = process.env.NODE_ENV === 'production' ? prodConfig : devConfig;

export default config;
