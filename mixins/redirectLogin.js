export default {
	methods: {
		fetch({ store, redirect }) {
			if (!store.state.user) {
				redirect('/auth/login')
			}
		}
	}
}