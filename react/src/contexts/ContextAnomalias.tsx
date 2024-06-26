import { createContext, useContext, useState, ReactNode, FC } from "react";

// Define la interfaz para el estado del usuario y los métodos para actualizar el estado
interface StateContextType {
    anomalia: object;
    setAnomalia: (anomalia: object) => void;
    anomalias: object;
    setAnomalias: (anomalia: object) => void;
}

// Crea el contexto con valores predeterminados adecuados según las interfaces
const StateContext = createContext<StateContextType>({
    anomalia: {},
    setAnomalia: () => {},
    anomalias: {},
    setAnomalias: () => {}
});

// Define el componente proveedor que envuelve a los hijos con el proveedor de contexto
interface ContextProviderProps {
    children: ReactNode;
}

export const ContextProvider: FC<ContextProviderProps> = ({ children }) => {
    const [anomalia, setAnomalia] = useState<object>({});
    const [anomalias, setAnomalias] = useState<object>({});
    

    return (
        <StateContext.Provider value={{
            anomalia,
            setAnomalia,
            anomalias,
            setAnomalias,
        }}>
            {children}
        </StateContext.Provider>
    );
};

// Hook personalizado para utilizar el contexto fácilmente
export const useStateContext = () => useContext(StateContext);