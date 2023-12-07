import React from 'react';
import CardEventRegister from '@/components/ui/cardGeneral/cardEventRegister/cardEventRegister';
import BaseLayout from '@/components/layouts/base-layout';

const IndexPage: React.FC = () => {
  const handleFormSubmit = (formValues:any) => {
    // Realiza la lógica de envío de datos aquí
    console.log('Datos del formulario:', formValues);
  
    // Puedes enviar los datos al servidor, actualizar el estado, etc.
  };
  
  return (
    <BaseLayout>
    <CardEventRegister onSubmit={handleFormSubmit} />
    </BaseLayout>
  );
};

export default IndexPage;