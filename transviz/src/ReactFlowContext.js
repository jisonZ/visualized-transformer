import { createContext, useState } from 'react'

const initialValue = {
    reactFlowInstance: null,
    setReactFlowInstance: () => {},
    duplicateNode: () => {},
    deleteNode: () => {},
    deleteEdge: () => {}
}

export const flowContext = createContext(initialValue)
