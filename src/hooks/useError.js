import { useState } from 'react';

const useError = () => {
    const [hasError, setHasError] = useState(false);

    return { hasError, setHasError };
}

export default useError;