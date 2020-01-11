/**
 * @module @edtr-io/ui
 */
/** Comment needed because of https://github.com/christopherthielen/typedoc-plugin-external-module-name/issues/337 */
import * as R from 'ramda'
import * as React from 'react'
import {
  ThemeProps as StyledThemeProps,
  ThemeContext as StyledThemeContext
} from 'styled-components'

import { DeepPartial } from './types'

/** @public */
export interface EditorTheme {
  backgroundColor: string
  color: string
  primary: {
    color: string
    background: string
  }
  secondary: {
    color: string
    background: string
  }
  success: {
    color: string
    background: string
  }
  info: {
    color: string
    background: string
  }
  warning: {
    color: string
    background: string
  }
  danger: {
    color: string
    background: string
  }
}

/** @public */
export const defaultEditorTheme: EditorTheme = {
  primary: {
    color: '#ffffff',
    background: 'rgb(70, 155, 255)'
  },
  secondary: {
    color: '#333333',
    background: '#eeeeee'
  },
  success: {
    color: '#ffffff',
    background: '#5cb85c'
  },
  info: {
    color: '#ffffff',
    background: '#5bc0de'
  },
  warning: {
    color: '#ffffff',
    background: '#f0ad4e'
  },
  danger: {
    color: '#ffffff',
    background: '#d9534f'
  },
  color: '#EEEEEE',
  backgroundColor: 'rgba(51,51,51,0.95)'
}

/** @public */
export interface ButtonTheme {
  backgroundColor: string
  color: string
  borderColor: string
  hoverBackgroundColor: string
  hoverColor: string
  hoverBorderColor: string
}

/** @public */
export interface CheckboxTheme {
  boxSelectedColor: string
  boxDeselectedColor: string
  color: string
}

/** @public */
export interface InputTheme {
  backgroundColor: string
  color: string
  highlightColor: string
}

/** @public */
export interface SelectTheme {
  backgroundColor: string
  color: string
  highlightColor: string
}

/** @public */
export interface TextareaTheme {
  backgroundColor: string
  color: string
  borderColor: string
  highlightColor: string
}

/** @public */
export interface BottomToolbarTheme {
  backgroundColor: string
  color: string
}

/** @public */
export interface EditorUiTheme {
  button: ButtonTheme
  checkbox: CheckboxTheme
  input: InputTheme
  bottomToolbar: BottomToolbarTheme
  textarea: TextareaTheme
  select: SelectTheme
}

/** @public */
export type EditorThemeProps = StyledThemeProps<{
  editor: EditorTheme
  editorUi: EditorUiTheme
}>

/**
 * React Hook for the editor theming
 *
 * @returns An object containing the current {@link EditorTheme | editor theme} and {@link EditorUiTheme | editor UI theme}
 * @public
 */
export function useEditorTheme(): {
  editor: EditorTheme
  editorUi: EditorUiTheme
} {
  return React.useContext(StyledThemeContext)
}

/**
 * Creates a function that maps {@link EditorThemeProps} to the current theme of the specified editor UI component
 *
 * @param createDefaultTheme - The {@link EditorUiThemeFactory | factory} for the default theme
 * @returns A function that accepts an editor UI component and {@link EditorThemeProps} and returns the current theme of the specified component
 * @public
 */
export function createEditorUiTheme<T extends object>(
  createDefaultTheme: EditorUiThemeFactory<T>
) {
  return (
    key: keyof EditorUiTheme,
    theme: { editor: EditorTheme; editorUi: EditorUiTheme }
  ): T => {
    return (R.mergeDeepRight(
      createDefaultTheme(theme.editor),
      ((theme.editorUi[key] as unknown) as DeepPartial<T>) || {}
    ) as unknown) as T
  }
}

/**
 * React Hook for the theme of an editor UI component
 *
 * @param key - The editor UI component
 * @param createDefaultTheme - The {@link EditorUiThemeFactory | factory} for the default theme
 * @returns The current theme of the specified component
 * @public
 */
export function useEditorUiTheme<T extends object>(
  key: keyof EditorUiTheme,
  createDefaultTheme: EditorUiThemeFactory<T>
) {
  const theme = useEditorTheme()
  return createEditorUiTheme(createDefaultTheme)(key, theme)
}

/** @public */
export type EditorUiThemeFactory<T extends object> = (theme: EditorTheme) => T
