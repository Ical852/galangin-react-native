import { showMessage } from 'react-native-flash-message'
import { customColors } from '../colors'

export const showError = (message) => {
    showMessage({
        message: message,
        type: 'default',
        backgroundColor: customColors.def.red,
        color: customColors.white
    })
}

export const showSuccess = (message) => {
    showMessage({
        message: message,
        type: 'default',
        backgroundColor: customColors.def.green1,
        color: customColors.white
    })
}