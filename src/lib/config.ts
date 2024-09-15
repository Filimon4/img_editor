
export enum ESettingsMenu {
  'crop',
  'resize',
  'rotate',
  'adjust',
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
  'gallery',
  'submit'
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
}

export type TImageAdjust = {
  crop: {
    ratio: '1:1' | '16:9' | '4:3' | 'None',
    x: number,
    y: number,
    width: number,
    height: number,
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
  adjust: {
    brightenes: number,
    contrast: number,
    saturation: number,
    exposition: number
  },
  filter: {
    type: 'None' | 'Black&White' | 'Sepia' | 'Vintage'
  },
  elements: any[];
}

export type TCreateElem = {
  type: EElemTypes,
}

export enum EElemTypes {
  'text',
  'line',
  'circle',
  'rect'
}

export enum Events {
  'applyCrop',
  'applyResize',
  'applyRotate',
  'applyAdjust',
  'applyFilters',
  'setCrop',
  'makeElem',
  'changeSettings',
  'download'
}

export const DefaultImageAdjust: TImageAdjust = {
  adjust: {
    brightenes: 0,
    contrast: 0,
    exposition: 0,
    saturation: 0,
  },
  crop: {
    ratio: 'None',
    x: 0,
    y: 0,
    width: 0,
    height: 0,
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
    deg: 180,
    flip: {
      hor: true,
      ver: true
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
    img: 'public/adjust.svg',
    text: 'adjust',
    menu: ESettingsMenu.adjust
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
        img: 'public/Elem_Text.svg',
        elemType: EElemTypes.text,
        data: {
          x: 0,
          y: 0,
          text: 'hello',
          fontSize: 15,
          fontFamily: "Arial",
          fill: 'red'
        }
      },
      {
        text: 'Line',
        img: 'public/Elem_Line.svg',
        elemType: EElemTypes.line,
        data: {
          x: 100,
          y: 100,
          stroke: 'green',
          strokeWidth: 4,
          points: [0, 0, 100, 100]
        }
      },
      {
        text: 'Circle',
        img: 'public/Elem_Circle.svg',
        elemType: EElemTypes.circle,
        data: {
          x: 0,
          y: 0,
          radius: 20,
          fill: "blue"
        },
      },
      {
        text: 'Rectangle',
        img: 'public/Elem_Rect.svg',
        elemType: EElemTypes.rect,
        data: {
          x: 0,
          y: 0,
          width: 100,
          height: 100,
          fill: 'blue'
        }
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
    },
    {
      type: ESettingTypes.submit,
      text: 'Applay chagnes',
      emitName: Events.setCrop,
      emitType: 'crop'
    },
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
    {
      type: ESettingTypes.submit,
      text: 'Applay chagnes',
      emitName: Events.applyResize,
      emitType: 'resize'
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
    }
  ],
  [ESettingsMenu.adjust]: [
    {
      type: ESettingTypes.negslider,
      text: 'Brightness',
      editType: 'adjust',
      editValue: 'brightenes'
    },
    {
      type: ESettingTypes.negslider,
      text: 'Contrast',
      editType: 'adjust',
      editValue: 'contrast'
    },
    {
      type: ESettingTypes.negslider,
      text: 'Saturation',
      editType: 'adjust',
      editValue: 'saturation'
    },
    {
      type: ESettingTypes.negslider,
      text: 'Exposition',
      editType: 'adjust',
      editValue: 'exposition'
    },
    {
      type: ESettingTypes.submit,
      text: 'Applay chagnes',
      emitName: Events.applyAdjust,
      emitType: 'adjust'
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