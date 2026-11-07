import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Institution } from '../../types';
import { mockInstitutions } from '../../data/mockData';

interface InstitutionContextType {
  currentInstitution: Institution;
  institutions: Institution[];
  selectInstitution: (id: string) => void;
  updateInstitutionBranding: (id: string, updates: Partial<Institution>) => void;
}

const InstitutionContext = createContext<InstitutionContextType | undefined>(undefined);

export const InstitutionProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [institutions, setInstitutions] = useState<Institution[]>(mockInstitutions);
  const [currentInstitutionId, setCurrentInstitutionId] = useState<string>(mockInstitutions[0].id);

  const currentInstitution = institutions.find(i => i.id === currentInstitutionId) || institutions[0];

  const selectInstitution = (id: string) => {
    setCurrentInstitutionId(id);
  };

  const updateInstitutionBranding = (id: string, updates: Partial<Institution>) => {
    setInstitutions(prev => prev.map(inst => inst.id === id ? { ...inst, ...updates } : inst));
  };

  return (
    <InstitutionContext.Provider
      value={{
        currentInstitution,
        institutions,
        selectInstitution,
        updateInstitutionBranding
      }}
    >
      {children}
    </InstitutionContext.Provider>
  );
};

export const useInstitution = (): InstitutionContextType => {
  const context = useContext(InstitutionContext);
  if (!context) {
    throw new Error('useInstitution must be used within an InstitutionProvider');
  }
  return context;
};
