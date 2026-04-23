import type { SiteRecipe } from '@/design/factory/recipe-types'

export const SITE_RECIPE: SiteRecipe = {
  productFamily: 'directory',
  themePack: 'directory-premium',
  homepageTemplate: 'listing-home',
  navbarTemplate: 'compact-bar',
  footerTemplate: 'columns-footer',
  motionPack: 'minimal',
  primaryTask: 'listing',
  enabledTasks: ['listing'],
  taskTemplates: { listing: 'listing-directory' },
  manualOverrides: {
    navbar: false,
    footer: false,
    homePage: false,
    taskListPage: false,
    taskDetailPage: false,
    taskCard: false,
    contactPage: false,
    loginPage: false,
    registerPage: false,
  },
}
