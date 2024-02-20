import { Box, Chip } from '@mui/material';
import { styled } from '@mui/material/styles';
import Tag from "@/models/Tag";

type TagProps = {
    tagList: Tag[] | null,
    onTagDelete: (tag: Tag) => void;
}

const ListItem = styled('li')(({ theme }) => ({
    margin: theme.spacing(0.4),
}));

const TagChip = ({tagList, onTagDelete}:TagProps) => {
    return (
        <Box
            sx={{
                display: 'flex',
                justifyContent: 'left',
                flexWrap: 'wrap',
                listStyle: 'none',
                p: 0.5,
                m: 0,
            }}
            component="ul"
            >
            {tagList ? tagList.map((tag) => {
                return (
                <ListItem key={tag.key}>
                    <Chip label={tag.label} onDelete={() => onTagDelete(tag)}/>
                </ListItem>
                );
            }) : <Chip label="#태그입력"/>}
            </Box>
    )

}


export default TagChip;