import type { NavItem } from '~/components/BaseBreadCrumbBar.vue';

export const usePageNavigationStore = defineStore('pageNavigationStore', () => {
    const navItems = ref<NavItem[]>([])

    function setNavItems(items: NavItem[]) {
        navItems.value = items
    }
  
    return { navItems, setNavItems }
})