import { useState } from 'react';
import AceEditor from 'react-ace';

import 'ace-builds/src-noconflict/mode-javascript';
import 'ace-builds/src-noconflict/theme-github';
import 'ace-builds/src-noconflict/ext-language_tools';

export default function CodeWar({ value }) {
  const [code, setCode] = useState(value);
  return (
    <AceEditor
      mode='javascript'
      theme='gtihub'
      value={code}
      onChange={(value) => {
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
