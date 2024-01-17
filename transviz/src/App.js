import { useEffect, useRef, useState, useCallback, useContext } from "react";
import ReactFlow, {
  addEdge,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
} from "reactflow";
import { useDispatch, useSelector } from "react-redux";
import { flowContext } from "./ReactFlowContext";

// material-ui
import { Toolbar, Box, AppBar, Button, collapseClasses } from '@mui/material'

// Project import
import CanvasNode from "./CanvasNode";
import ButtonEdge from "./ButtonEdge";

// Utils
import { getUniqueNodeId } from "./utils";

const nodeTypes = { customNode: CanvasNode };
const edgeTypes = { buttonedge: ButtonEdge };

// Define Main Canvas

const Canvas = () => {
  // ReactFlow Imports
  const [nodes, setNodes, onNodesChange] = useNodesState();
  const [edges, setEdges, onEdgesChange] = useEdgesState();
  const [selectedNode, setSelectedNode] = useState(null)
  const reactFlowWrapper = useRef(null)

  // Context
  const { reactFlowInstance, setReactFlowInstance } = useContext(flowContext);

  // Redux
  const canvas = useSelector((state) => state.canvas)
  const dispatch = useDispatch();

  const onNodeClick = useCallback((event, clickedNode) => {
    /**
     * set Clicked Nodes as selected
     */
    setSelectedNode(clickedNode);
    setNodes((nds) =>
      nds.map((node) => {
        if (node.id === clickedNode.id) {
          node.data = {
            ...node.data,
            selected: true,
          };
        } else {
          node.data = {
            ...node.data,
            selected: false,
          };
        }

        return node;
      })
    );
  });

  const onDrop = useCallback(
    (event) => {
      /**
       * when dropping an item on Canvas
       */
      event.preventDefault();
      const reactFlowBounds = reactFlowWrapper.current.getBoundingClientRect();
      // there's a corresponding "onDrag" that setData
      let nodeData = event.dataTransfer.getData("application/reactflow");

      // check if the dropped element is valid
      if (typeof nodeData === "undefined" || !nodeData) {
        return;
      }

      nodeData = JSON.parse(nodeData);

      const position = reactFlowInstance.project({
        x: event.clientX - reactFlowBounds.left - 100,
        y: event.clientY - reactFlowBounds.top - 50,
      });

      const newNodeId = getUniqueNodeId(nodeData, reactFlowInstance.getNodes());

      const newNode = {
        id: newNodeId,
        position,
        type: "customNode",
        data: initNode(nodeData, newNodeId),
      };

      setSelectedNode(newNode);
      setNodes((nds) =>
        nds.concat(newNode).map((node) => {
          if (node.id === newNode.id) {
            node.data = {
              ...node.data,
              selected: true,
            };
          } else {
            node.data = {
              ...node.data,
              selected: false,
            };
          }

          return node;
        })
      );
      setTimeout(() => setDirty(), 0);
    },

    // eslint-disable-next-line
    [reactFlowInstance]
  );

  const onDragOver = useCallback((event) => {
    /**
     * called while being dragged
     */
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  }, []);

  const setDirty = () => {
    /**
     * TODO: Set Dirty for 'Unititled*' saving option
     */
    // dispatch({ type: SET_DIRTY })
  };

  const onConnect = (params) => {
    /**
     * when connecting two nodes
     */
    const newEdge = {
      ...params,
      type: "buttonedge",
      id: `${params.source}-${params.sourceHandle}-${params.target}-${params.targetHandle}`,
    };

    const targetNodeId = params.targetHandle.split("-")[0];
    const sourceNodeId = params.sourceHandle.split("-")[0];
    const targetInput = params.targetHandle.split("-")[2];

    setNodes((nds) =>
      nds.map((node) => {
        if (node.id === targetNodeId) {
          setTimeout(() => setDirty(), 0);
          let value;
          const inputAnchor = node.data.inputAnchors.find(
            (ancr) => ancr.name === targetInput
          );
          const inputParam = node.data.inputParams.find(
            (param) => param.name === targetInput
          );

          if (inputAnchor && inputAnchor.list) {
            const newValues = node.data.inputs[targetInput] || [];
            if (targetInput === "tools") {
              rearrangeToolsOrdering(newValues, sourceNodeId);
            } else {
              newValues.push(`{{${sourceNodeId}.data.instance}}`);
            }
            value = newValues;
          } else if (inputParam && inputParam.acceptVariable) {
            value = node.data.inputs[targetInput] || "";
          } else {
            value = `{{${sourceNodeId}.data.instance}}`;
          }
          node.data = {
            ...node.data,
            inputs: {
              ...node.data.inputs,
              [targetInput]: value,
            },
          };
        }
        return node;
      })
    );

    setEdges((eds) => addEdge(newEdge, eds));
  };

  return (
    <>
      <Box>
        <Box sx={{ pt: "70px", height: "100vh", width: "100%" }}>
          <div className="reactflow-parent-wrapper">
            <div className="reactflow-wrapper" ref={reactFlowWrapper}>
              <ReactFlow
                nodes={nodes}
                edges={edges}
                onNodesChange={onNodesChange}
                onNodeClick={onNodeClick}
                onEdgesChange={onEdgesChange}
                // onDrop is provided by JS
                onDrop={onDrop}
                onDragOver={onDragOver}
                onNodeDragStop={setDirty}
                nodeTypes={nodeTypes}
                edgeTypes={edgeTypes}
                onConnect={onConnect}
                onInit={setReactFlowInstance}
                fitView
                deleteKeyCode={
                  canvas.canvasDialogShow ? null : ["Backspace", "Delete"]
                }
                minZoom={0.1}
              >
                <Controls
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                  }}
                />
                <Background color="#aaa" gap={16} />
                <AddNodes nodesData={getNodesApi.data} node={selectedNode} />
              </ReactFlow>
            </div>
          </div>
        </Box>
      </Box>
    </>
  );
};

export default Canvas;
