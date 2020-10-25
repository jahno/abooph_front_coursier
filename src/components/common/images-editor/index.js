import React, {useRef, useState} from "react";
import AvatarEditorRef from 'react-avatar-editor'

import { ImageCard, CustomSelectImg } from './components'

export default function ImageEditor (props) {
  const {image, inputName, getImageResult, isLoading, label} = props

  const editorRef = useRef(null)
  
  const [state, setState ] = useState({ scale: 0.7, rotate: 0})

  function onImageChange() {
    if (editorRef.current && image) {
      const canvasScaled = editorRef.current.getImageScaledToCanvas()
      getImageResult(inputName, canvasScaled.toDataURL())
    }
  }
 
  function setEditorRefRef(editor){
    editorRef.current = editor
  }

  function handleScale(e, value){
    const scale = parseFloat(value)
    setState(state => ({...state, scale }))
  }

  function handleRotate(direction) {
    if(direction === 'right'){
      setState(state => ({...state, rotate: state.rotate + 90 }))
    }else if(direction === 'left'){
      setState(state => ({...state, rotate: state.rotate - 90 }))
    }
  }

  return (
    <>
    {(image && !isLoading) ? (
      <ImageCard 
        updateImage={() => {
          const imput = document.getElementsByName(inputName)
          imput[0].click()
        }}
        isLoading={isLoading}
        handleScale={handleScale}
        scale={state.scale}
        handleRotate={handleRotate}
      >
        <AvatarEditorRef
          ref={setEditorRefRef}
          onImageChange={onImageChange}
          image={image}
          width={230}
          height={230}
          // width={isMobile ? 150 : 230}
          // height={isMobile ? 150 : 230}
          border={[0, 0]}
          scale={parseFloat(state.scale)}
          rotate={parseFloat(state.rotate)}
          // color={[170, 164, 164, 164, 0.3]} // couleur de la bordure
          style={{background: 'white'}} // style appliqué à l'image
        />
      </ImageCard>
    ):(
      <CustomSelectImg 
        inputName={inputName} 
        label={label}
        isLoading={isLoading}
        selectImg={() => {
          const imput = document.getElementsByName(inputName)
          imput[0].click()
        }}
      />
    )}
    </>
  )
}