import address from '../../mocks/addresses.json'
import {vi} from 'vitest'

vi.mock('@/services/resources', () => {
    return {
        address: {
            getAddresses: vi.fn(async () => {
                return await JSON.parse(JSON.stringify(address))
            })
        }
    }
})