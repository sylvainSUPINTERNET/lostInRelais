import React, { useEffect } from 'react';

export default function Ke({props}:{props:any}) {
    useEffect(() => {
        console.log('Ke component mounted');
    }, []);
    
    return (
      <div>
        <p>CLIENT React component {props}</p>
      </div>
    );
  }