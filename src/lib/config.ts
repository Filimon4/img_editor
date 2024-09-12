
export enum ESettingsMenu {
  'crop',
  'resize',
  'rotate',
  'abjust',
  'filter',
  'text',
  'line',
  'circle',
  'rect'
}

export enum ESettingTypes {
  'select',
  'input',
  'checkbox',
  'imgbox',
  'negslider',
  'gallery'
}

export enum ERotaionTypes {
  'left',
  'right',
  'hor',
  'ver'
}

export enum EFilterTypes {
  'none',
  'b&w',
  'sepia',
  'vintage'
}

export type TImageAdjust = {
  crop: {
    ratio: '1:1' | '16:9' | '4:3' | 'None'
  },
  resize: {
    width: number,
    height: number,
    aspect: boolean
  },
  rotate: {
    deg: number;
    flip: {
      hor: boolean,
      ver: boolean
    }
  },
  abjust: {
    brightenes: number,
    contrast: number,
    saturation: number,
    exposition: number
  },
  filter: {
    type: 'None' | 'Black%White' | 'Sepia' | 'Vintage'
  },
  elements: any[];
}

export const DefaultImageAdjust: TImageAdjust = {
  abjust: {
    brightenes: 0,
    contrast: 0,
    exposition: 0,
    saturation: 0,
  },
  crop: {
    ratio: 'None' 
  },
  filter: {
    type: 'None'
  },
  resize: {
    aspect: false,
    height: null,
    width: null
  },
  rotate: {
    deg: 0,
    flip: {
      hor: false,
      ver: false
    }
  },
  elements: []
}

export const editorNav = [
  {
    img: 'public/crop.svg',
    text: 'Crop',
    menu: ESettingsMenu.crop
  },
  {
    img: 'public/resize.svg',
    text: 'Resize',
    menu: ESettingsMenu.resize
  },
  {
    img: 'public/rotate.svg',
    text: 'Rotate and flip',
    menu: ESettingsMenu.rotate
  },
  {
    img: 'public/abjust.svg',
    text: 'Abjust',
    menu: ESettingsMenu.abjust
  },
  {
    img: 'public/filter.svg',
    text: 'Filter',
    menu: ESettingsMenu.filter
  },
]

export const dropdownNav = [
  {
    img: 'public/elements.svg',
    text: 'Elements',
    menu: [
      {
        text: 'Text',
        img: 'public/Elem_Text.svg'
      },
      {
        text: 'Line',
        img: 'public/Elem_Line.svg'
      },
      {
        text: 'Circle',
        img: 'public/Elem_Circle.svg'
      },
      {
        text: 'Rectangle',
        img: 'public/Elem_Rect.svg'
      },
    ]
  },
]

export const settigsMenuConfig = {
  [ESettingsMenu.crop]: [
    {
      type: ESettingTypes.select,
      text: 'Crop ratio',
      select: [
        'None', '1:1','16:9','4:3' 
      ],
      editType: 'crop',
      editValue: 'ratio'
    }
  ],
  [ESettingsMenu.resize]: [
    {
      type: ESettingTypes.input,
      text: 'Width (px)',
      input: {
        type: 'number'
      },
      editType: 'resize',
      editValue: 'width'
    },
    {
      type: ESettingTypes.input,
      text: 'Height (px)',
      input: {
        type: 'number'
      },
      editType: 'resize',
      editValue: 'height'
    },
    {
      type: ESettingTypes.checkbox,
      text: 'Constrain proportions',
      input: {
        id: 'aspect'
      },
      editType: 'resize',
      editValue: 'aspect'
    },
  ],
  [ESettingsMenu.rotate]: [
    {
      type: ESettingTypes.imgbox,
      text: 'Rotate',
      editType: 'rotate',
      imgbox: [
        {
          type: ERotaionTypes.left,
          editType: 'deg',
          editValue: -90
        },
        {
          type: ERotaionTypes.right,
          editType: 'deg',
          editValue: 90
        },
      ],
    },
    {
      type: ESettingTypes.imgbox,
      text: 'Flip',
      editType: 'rotate',
      imgbox: [
        {
          type: ERotaionTypes.hor,
          editType: 'flip',
          editValue: 'hor'
        },
        {
          type: ERotaionTypes.ver,
          editType: 'flip',
          editValue: 'ver'
        },
      ],
    },
  ],
  [ESettingsMenu.abjust]: [
    {
      type: ESettingTypes.negslider,
      text: 'Brightness',
      editType: 'abjust',
      editValue: 'brightenes'
    },
    {
      type: ESettingTypes.negslider,
      text: 'Contrast',
      editType: 'abjust',
      editValue: 'contrast'
    },
    {
      type: ESettingTypes.negslider,
      text: 'Saturation',
      editType: 'abjust',
      editValue: 'saturation'
    },
    {
      type: ESettingTypes.negslider,
      text: 'Exposition',
      editType: 'abjust',
      editValue: 'exposition'
    },
  ],
  [ESettingsMenu.filter]: [
    {
      type: ESettingTypes.gallery,
      editType: 'filter',
      gallery: [
        {
          text: 'None',
          editType: 'type',
          editValue: 'None'
        },
        {
          text: 'Black&White',
          editType: 'type',
          editValue: 'Black&White'
        },
        {
          text: 'Sepia',
          editType: 'type',
          editValue: 'Sepia'
        },
        {
          text: 'Vintage',
          editType: 'type',
          editValue: 'Vintage'
        },
      ]
    }
  ],
  [ESettingsMenu.text]: [
  ],
  [ESettingsMenu.line]: [
  ],
  [ESettingsMenu.circle]: [
  ],
  [ESettingsMenu.rect]: [
  ],
}