import { useState } from 'react';
import AceEditor from 'react-ace';

import 'ace-builds/src-noconflict/mode-javascript';
import 'ace-builds/src-noconflict/theme-github';

export default function Editor({ value, onChange }) {
  const [code, setCode] = useState(value);
  return (
    <AceEditor
      mode='javascript'
      theme='github'
      value={code}
      onChange={(value) => {
        onChange(value);
        setCode(value);
      }}
      fontSize={16}
      width='100%'
      height='100%'
      // showPrintMargin={true}
      showGutter={false}
      // highlightActiveLine={true}
      editorProps={{ $blockScrolling: true }}
    />
  );
}
