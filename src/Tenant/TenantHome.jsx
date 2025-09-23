import { useState, useEffect } from 'react';

export default function TenantHome() {
  const [tenant, setTenant] = useState("");

  useEffect(() => {
    const storedTenant = sessionStorage.getItem('tenant');
    if (storedTenant) {
      setTenant(JSON.parse(storedTenant));
    }
  }, []);

  return (
    <div>
      <h3>Hello {tenant.name}</h3>
    </div>
  );
}
