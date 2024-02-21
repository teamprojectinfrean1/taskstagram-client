import { Chip, Autocomplete, TextField } from '@mui/material';

type TagProps = {
    tagList: string[] | null,
    onTagSelectionChange: (tags: string[] | null) => void;
}

const TaskTagChipMaker = ({tagList, onTagSelectionChange}:TagProps) => {
    const handleTagsChange = (event: React.SyntheticEvent<Element, Event>, value: string[] | null) => {
        onTagSelectionChange(value);
    }
    return (
        <Autocomplete
            multiple
            freeSolo
            disableClearable
            value={tagList ?? []}
            onChange={handleTagsChange}
            options={[]}
            renderTags={(value, getTagProps) =>
            value.map((option, index) => (
                <Chip label={"#" + option} {...getTagProps({ index })}/>
            ))
            }
            renderInput={params => (
            <TextField
                {...params}
                variant="outlined"
                placeholder="태그입력"
            />
            )}
        />
    )

}


export default TaskTagChipMaker;