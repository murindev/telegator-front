import XPopup from "@/components/ui/popups/x-popup.vue";
import { createConfirmDialog } from 'vuejs-confirm-dialog'

const useConfirm = (action: any, props: any) => {
    const { reveal, onConfirm } = createConfirmDialog(XPopup, props)

    onConfirm(action)

    reveal()
}

export default useConfirm
