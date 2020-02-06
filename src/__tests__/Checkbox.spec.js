import React from 'react'
import { render, cleanup, fireEvent } from '@testing-library/react'
import { Checkbox } from '../components/Checkbox'

beforeEach(cleanup)

jest.mock('../firebase', () => ({
    firebase: {
        firestore: jest.fn(() => ({
            collection: jest.fn(() => ({
                doc: jest.fn(() => ({
                    update: jest.fn(),
                })),
            })),
        })),
    },
}))

describe('<Checkbox />', () => {
    describe('Success', () => {
        it('renders the task checkbox', () => {
            const { queryByTestId } = render(
                <Checkbox id="1" taskDesc="Finish the tutorial" />
            )
            expect(queryByTestId('checkbox-action')).toBeTruthy()
        })

        it('renders task checkbox and accepts clicking', () => {
            const { queryByTestId } = render(
                <Checkbox id="1" taskDesc="Finish the tutorial" />
            )
            expect(queryByTestId('checkbox-action')).toBeTruthy()
            fireEvent.click(queryByTestId('checkbox-action'))
        })

        it('renders task checkbox and accepts keyDown', () => {
            const { queryByTestId } = render(
                <Checkbox id="1" taskDesc="Finish the tutorial" />
            )
            expect(queryByTestId('checkbox-action')).toBeTruthy()
            fireEvent.keyDown(queryByTestId('checkbox-action'))
        })
    })
})
