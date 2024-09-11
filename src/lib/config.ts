
export enum ESettingsMenu {
  'crop',
  'resize',
  'rotate',
  'abjust',
  'filter',
  'text',
  'line',
  'cricle',
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
      type:ESettingTypes.select,
      text: 'Crop ratio',
      select: [
        '1:1','16:9','4:3'
      ]
    }
  ],
  [ESettingsMenu.resize]: [
    {
      type: ESettingTypes.input,
      text: 'Width (px)',
      input: {
        type: 'number'
      }
    },
    {
      type: ESettingTypes.input,
      text: 'Height (px)',
      input: {
        type: 'number'
      }
    },
    {
      type: ESettingTypes.checkbox,
      text: 'Constrain proportions',
      input: {
        id: 'aspect'
      }
    },
  ],
  [ESettingsMenu.rotate]: [
    {
      type: ESettingTypes.imgbox,
      text: 'Rotate',
      imgbox: [
        {
          type: ERotaionTypes.left
        },
        {
          type: ERotaionTypes.right
        },
      ]
    },
    {
      type: ESettingTypes.imgbox,
      text: 'Flip',
      imgbox: [
        {
          type: ERotaionTypes.hor
        },
        {
          type: ERotaionTypes.ver
        },
      ]
    },
  ],
  [ESettingsMenu.abjust]: [
    {
      type: ESettingTypes.negslider,
      text: 'Brightness'
    },
    {
      type: ESettingTypes.negslider,
      text: 'Contrast'
    },
    {
      type: ESettingTypes.negslider,
      text: 'Saturation'
    },
    {
      type: ESettingTypes.negslider,
      text: 'Exposition'
    },
  ],
  [ESettingsMenu.filter]: [
    {
      type: ESettingTypes.gallery,
      gallery: [
        {
          text: 'None',
        },
        {
          text: 'Black& White',
        },
        {
          text: 'Sepia',
        },
        {
          text: 'Vintage',
        },
      ]
    }
  ],
  [ESettingsMenu.text]: [
  ],
  [ESettingsMenu.line]: [
  ],
  [ESettingsMenu.cricle]: [

  ],
  [ESettingsMenu.rect]: [

  ],
}