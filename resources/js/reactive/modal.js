import { ref } from 'vue'

export const modalVisibility = ref(false)

export const toggleModalVisibility = () => {
    console.log(12321)
	modalVisibility.value = !modalVisibility.value
	if (modalVisibility.value) {
		document.body.classList.add('modal-open')
	} else {
		document.body.classList.remove('modal-open')
	}
}
