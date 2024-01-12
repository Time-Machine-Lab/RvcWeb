/*
 * @Author: Dhx
 * @Date: 2023-12-14 02:41:30
 * @Description: 
 * @FilePath: \RvcWeb\src\custom-types.d.ts
 */
import { SlateDescendant, SlateElement, SlateText, ImageElement } from '@wangeditor/editor'

declare module '@wangeditor/editor' {
    // 扩展 Text
    interface SlateText {
        text: string
    }

    // 扩展 Element
    interface SlateElement {
        type: string
        children: SlateDescendant[]
    }
    export type ImageStyle = {
        width?: string
        height?: string
    }

    export type ImageElement = {
        type: 'image'
        src: string
        alt?: string
        href?: string
        style?: ImageStyle
        children: EmptyText[]
    }
}
declare module 'lamejs' { }