import type { NavItem, ActionItem } from '~/components/BaseBreadCrumbBar.vue';

export const usePageNavigationStore = defineStore('pageNavigationStore', () => {
    const navItems = ref<NavItem[]>([])
    const actionItems = ref<ActionItem[]>([])

    function setNavItems(items: NavItem[]) {
        navItems.value = items
    }

    function setActionItems(items: ActionItem[]) {
        actionItems.value = items
    }
  
    return { navItems, setNavItems, actionItems, setActionItems }
})