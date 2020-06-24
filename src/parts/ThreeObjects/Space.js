import React, { useMemo } from 'react'
import spaceTexture from '../../assets/textures/space.jpg'
import { TextureLoader, MeshBasicMaterial, BackSide, RepeatWrapping } from 'three'

export function Space() {

    const texture = useMemo(() => {
        const texture = new TextureLoader().load(spaceTexture)
        texture.wrapT = RepeatWrapping
        texture.wrapS = RepeatWrapping
        texture.repeat.set(8, 4)
        return texture
    }, [])

    return (
        <mesh
            material={new MeshBasicMaterial({
                map: texture,
                side: BackSide
            })}
            >
            <sphereBufferGeometry attach="geometry" args={[20, 12, 12]} />
        </mesh>
        )
}