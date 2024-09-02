import React, { useEffect, useRef, useState } from 'react'
import Tree from 'react-d3-tree';

const DisplayJsonTreeFormate = ({ data }) => {
    const [treeData, setTreeData] = useState({});
    const [translate, setTranslate] = useState({ x: 0, y: 0 });
    const containerRef = useRef(null);


    useEffect(() => {
        const dimensions = containerRef.current?.getBoundingClientRect();
        if (dimensions) {
          setTranslate({
            x: dimensions.width / 2,
            y: dimensions.height / 4,
          });
        }
      }, []);

    function convertToTreeData(obj, nodeName = 'root') {
        const treeData = {
            name: nodeName,
            children: [],
        };

        Object.keys(obj).forEach((key) => {
            const value = obj[key];

            if (typeof value === 'object' && value !== null && !Array.isArray(value)) {

                treeData.children.push(convertToTreeData(value, key));
            } else {

                treeData.children.push({
                    name: `${key}: ${value}`,
                });
            }
        });


        if (treeData.children.length === 0) {
            return { name: nodeName };
        }

        return treeData;
    }

    useEffect(() => {
        setTreeData(convertToTreeData(data))
    }, [])


    const nodeSize = { x: 300, y: 200 };
    const separation = { siblings: 2, nonSiblings: 3 };

    return (
        <div className='w-full h-[500px]'>
            <Tree
                data={treeData}
                orientation="vertical" // Vertical orientation of the tree
                nodeSize={nodeSize}
                separation={separation}
                translate={translate} // Centering the tree
                pathFunc="diagonal" // Use elbow or diagonal path styles
                scaleExtent={{ min: 0.1, max: 1 }} // Control zoom range
                zoomable={true}
                transitionDuration={300} // Smooth zoom transitions
                zoom={0.1} // Default zoom level
                styles={{
                    nodes: {
                        node: {
                            circle: { stroke: '#000', fill: '#ddd' }, // Customize node circle
                            name: { stroke: 'none', fill: '#000', fontSize: '14px' }, // Node name style
                            attributes: { stroke: 'none', fill: '#666', fontSize: '12px' }, // Attribute text style
                        },
                        leafNode: {
                            circle: { stroke: '#000', fill: '#fff' },
                            name: { stroke: 'none', fill: '#000', fontSize: '14px' },
                            attributes: { stroke: 'none', fill: '#666', fontSize: '12px' },
                        },
                    },
                    links: {
                        stroke: '#000',
                        strokeWidth: 2, // Thicker lines for links
                    },
                }}
            />
        </div>
    )
}

export default DisplayJsonTreeFormate