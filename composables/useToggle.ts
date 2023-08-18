/**
 *  Takes a reactive boolean value and toggles it.
 */
export default (valueToToggle: Ref<boolean>): void => {
    valueToToggle.value = !valueToToggle.value;
}