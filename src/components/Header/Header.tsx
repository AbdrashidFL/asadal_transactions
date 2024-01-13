'use client';

import Link from 'next/link';
import './header.scss';

export const Header = () => {
	return (
		<>
			<header className="header">
				<div className="container">
					<nav>
						<Link href={'/'}>Main</Link>
						<Link href={'/statistics'}>Statistics</Link>
					</nav>
				</div>
			</header>
		</>
	);
};
