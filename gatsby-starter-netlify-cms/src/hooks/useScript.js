import { useEffect } from 'react';

const useScript = url => {
  useEffect(() => {
    if(document){const script = document.createElement('script');

    script.src = url;
    script.async = true;

    document.body.appendChild(script);
}
    
    return () => {
      if(document)document.body.removeChild(script);
    }
  }, [url]);
};

export default useScript;