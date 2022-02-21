import TextareaAutosize from '@mui/base/TextareaAutosize';
import { Box } from '@mui/material';

function ArticleCommentBox() {
  return (
    <Box>
      <TextareaAutosize
        maxRows={4}
        placeholder="Maximum 4 rows"
        defaultValue="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt
            ut labore et dolore magna aliqua."
      />
    </Box>
  )
}

export default ArticleCommentBox;