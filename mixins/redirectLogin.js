export default {
	fetch({ store, redirect }) {
		if (!store.state.user) {
			redirect('/auth/login')
		}
	},
}