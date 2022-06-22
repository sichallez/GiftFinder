import React, {Component} from 'react'
import { updateUser } from '../../store/auth'
import { connect } from 'react-redux'


class UpdateUser extends Component {
	//constructor(prop) {
	//	super(prop)
	//	this.state = {
	//		name: ''
	//	}
	//}
	render () {
		return (
			<h2>asdfadsfadsf</h2>
		)
	}
}


const mapState = ({ auth }) => {
	return {
		auth
	}
}

const mapDispatch = dispatch => {
	return {
		updateUser: (user) => {
			dispatch(updateUser(user))
		}
	}
}

export default connect(mapState, mapDispatch)(UpdateUser)
