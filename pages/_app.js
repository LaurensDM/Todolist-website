import '../styles/globals.css';
// import Transition from '@/components/Transition';
// import MyAuth0Provider from '@/components/MyAuthProvider';
import {UserProvider} from '@auth0/nextjs-auth0/client';
import AuthButton from '@/components/AuthButton';

export default function App({ Component, pageProps }) {

	return (
		<UserProvider >
			<div className='flex justify-end'>
			<AuthButton />
			</div>
				<Component {...pageProps} />
		</UserProvider>

	);
}
