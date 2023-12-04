import { useDispatch, TypedUseSelectorHook, useSelector } from 'react-redux'

import { TAppDispatch, TRootState } from '../services/store'

export const useAppDispatch: () => TAppDispatch = useDispatch<TAppDispatch>
export const useAppSelector: TypedUseSelectorHook<TRootState> = useSelector
