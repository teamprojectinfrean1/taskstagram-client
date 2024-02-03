import { Modal, Box } from '@mui/material';

type ModalProps={
    isOpen: boolean,
    onCloseModal: () => void;
}

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
  };

const TaskModal = ({isOpen, onCloseModal}:ModalProps) =>{
    return <div>
        <Modal open={isOpen} onClose={onCloseModal}>
            <Box sx={style}>
            </Box>
        </Modal>
    </div>
}

export default TaskModal;