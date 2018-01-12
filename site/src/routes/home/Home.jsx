import React from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';

import s from './Home.scss';

class Home extends React.Component {
	render() {
		const { users } = this.props;

		return (
			<div className={s.container}>
				<ul>
					{users.map(user => <li key={user.id}>{user.name}</li>)}
				</ul>
			</div>
		);
	}
}

export default withStyles(s)(Home);
