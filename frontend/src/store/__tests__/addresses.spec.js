import { it, afterEach, describe, beforeEach, expect } from 'vitest';
import '@/store/__tests__/mockServices';

import { createPinia, setActivePinia } from 'pinia';
import { useProfileStore } from "../index";

describe('profile store', () => {
    let profileStore
    beforeEach(async () => {
        // Определяем Pinia
        setActivePinia(createPinia())
        profileStore = useProfileStore()
        await profileStore.getAddresses
    })

    it('should have initial addresses', async () => {
        // Количество загруженных колонок должно соответствовать количеству в нашем файле columns.json
        expect(profileStore.addresses.length).toBe(1)
    })
})