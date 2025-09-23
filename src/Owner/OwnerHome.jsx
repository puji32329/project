import { useState, useEffect } from 'react';

export default function OwnerHome() {
  const [owner, setOwner] = useState("");

  useEffect(() => {
    const storedOwner = sessionStorage.getItem('owner');
    if (storedOwner) {
      setOwner(JSON.parse(storedOwner));
    }
  }, []);

  return (
    <div>
      <h3>Hello {owner.name}</h3>
    </div>
  );
}
