import { useState, useCallback } from "react";

function useInput(initialValue = null) {
  const [value, setValue] = useState();
  const handler = useCallback(
    (e) => {
      setValue(e.target.value)
    },
    [],
  );
  return [value, handler]
}

export default useInput;