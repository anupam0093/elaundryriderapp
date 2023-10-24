import { GarmentBrands } from "./constans/GarmentBrand"
import { GarmentsColors } from "./constans/GarmentColors"
import { GarmentDefects } from "./constans/GarmentDefect"

export const getDefectName = (id)=>{
    const defect = GarmentDefects.find(defect => defect.id === id)
    return defect?.garmentDefectName
}

export const getBrandName = (id)=>{
    const defect = GarmentBrands.find(defect => defect.id === id)
    return defect?.garmentBrandName
}

export const getItemColor = (id)=>{
    const defect = GarmentsColors.find(defect => defect.id === id)
    return defect?.garmentColorName
}