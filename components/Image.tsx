import NextImage, { ImageProps } from 'next/image'

const Image = ({ ...rest }: ImageProps) => <NextImage className='rounded-xl shadow-[5px_5px_20px_0_rgba(0,0,0,0.3)]' {...rest} />

export default Image
