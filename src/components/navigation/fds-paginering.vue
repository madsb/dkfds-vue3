<template>
  <nav
    v-if="show"
    :id="id"
    class="pagination"
    :aria-label="`Paginering, side ${currentPage} af ${lastPage}`"
    role="navigation"
  >
    <a
      v-if="showFirstLast && currentPage > 1"
      href="#"
      class="button button-arrow button-first"
      aria-label="Gå til første side"
      @click="handlePageChange($event, 1)"
    >
      <fds-ikon icon="first-page" :decorative="true" />
      <span class="sr-only">Første side</span>
    </a>
    <a
      v-if="currentPage > 1"
      href="#"
      class="button button-arrow button-previous"
      aria-label="Gå til forrige side"
      @click="handlePageChange($event, currentPage - 1)"
    >
      <fds-ikon icon="chevron-left" :decorative="true" />
      <span class="pagination-nav-link">Forrige</span>
    </a>
    <span class="pagination-mobile" aria-live="polite"
      >Side {{ currentPage }} af {{ lastPage }}</span
    >
    <ul class="pagination__items">
      <li
        v-for="page in generatePages()"
        :key="page.index"
        class="pagination-item"
        :class="[{ 'pagination-number': !page.dotted }, { 'pagination-overflow': page.dotted }]"
      >
        <a
          v-if="currentPage === page.index"
          href="#"
          class="button current-page"
          :aria-label="`Aktuel side, side ${page.index}`"
          aria-current="page"
          @click="$event.preventDefault()"
        >
          {{ page.index }}
        </a>
        <a
          v-else-if="!page.dotted"
          href="#"
          class="button button-secondary"
          :aria-label="`Gå til side ${page.index}`"
          @click="handlePageChange($event, page.index)"
        >
          {{ page.index }}
        </a>
        <span v-else-if="page.dotted" aria-hidden="true">…</span>
      </li>
    </ul>
    <a
      v-if="currentPage < lastPage"
      href="#"
      class="button button-arrow button-next"
      aria-label="Gå til næste side"
      @click="handlePageChange($event, currentPage + 1)"
    >
      <span class="pagination-nav-link">Næste</span>
      <fds-ikon icon="chevron-right" :decorative="true" />
    </a>
    <a
      v-if="showFirstLast && currentPage < lastPage"
      href="#"
      class="button button-arrow button-last"
      aria-label="Gå til sidste side"
      @click="handlePageChange($event, lastPage)"
    >
      <fds-ikon icon="last-page" :decorative="true" />
      <span class="sr-only">Sidste side</span>
    </a>
  </nav>
</template>

<script setup lang="ts">
/**
 * Pagination navigation component implementing DKFDS v11 specifications.
 * 
 * Provides accessible pagination controls with support for large datasets,
 * smart ellipsis handling, and keyboard navigation. Supports both array-based
 * pagination (internal) and external pagination with total counts. Features
 * responsive design with mobile-friendly "Side X af Y" display and first/last
 * navigation buttons.
 * 
 * @component
 * @example Basic array pagination
 * ```vue
 * <fds-paginering 
 *   :list="items"
 *   :page-size="10"
 *   @filtered-page="handlePageData"
 *   @page-change="handlePageChange"
 * />
 * ```
 * 
 * @example External pagination with total count
 * ```vue
 * <fds-paginering 
 *   :total-items="totalCount"
 *   :skip="currentSkip"
 *   :page-size="20"
 *   :max-elements="5"
 *   :show-first-last="false"
 *   @skip="handleSkipChange"
 * />
 * ```
 * 
 * @example Large dataset with custom configuration
 * ```vue
 * <fds-paginering 
 *   :total-items="10000"
 *   :skip="skip"
 *   :page-size="50"
 *   :max-elements="9"
 *   :show-first-last="true"
 *   @page-change="loadPage"
 * />
 * ```
 * 
 * @see {@link https://designsystem.dk/komponenter/paginering/} DKFDS Pagination Documentation
 */
import { generateId } from '../../composables'
import type { FdsPaging } from '../../types'
import { computed, ref, watch } from 'vue'
import FdsIkon from '../layout/fds-ikon.vue'

export interface FdsPagineringProps {
  /** 
   * Array of items to paginate
   * For internal pagination mode. Items will be sliced based on current page.
   * Leave empty when using external pagination with totalItems.
   * @default []
   */
  list?: any[]
  /** 
   * Number of items to skip (for external pagination)
   * Used with external APIs. Automatically calculated for internal pagination.
   * @default 0
   */
  skip?: number
  /** 
   * Number of items per page
   * Controls how many items are shown per page for both internal and external pagination.
   * @default 10
   */
  pageSize?: number
  /** 
   * Maximum number of visible page elements (includes ellipsis)
   * Controls pagination complexity. Includes numbered pages and ellipsis (...) in count.
   * Recommended: 5-9 for optimal UX.
   * @default 7
   */
  maxElements?: number
  /** 
   * Show first/last navigation buttons
   * Adds "First" and "Last" buttons for quick navigation in large datasets.
   * @default true
   */
  showFirstLast?: boolean
  /** 
   * Unique identifier for the pagination component
   * Auto-generated if not provided. Used for ARIA labeling.
   */
  id?: string
  /** 
   * Total number of items (for external pagination)
   * Required for external pagination. Ignored when list prop has items.
   * @default 0
   */
  totalItems?: number
}

const props = withDefaults(defineProps<FdsPagineringProps>(), {
  list: () => [],
  skip: 0,
  pageSize: 10,
  maxElements: 7,
  showFirstLast: true,
  id: () => generateId('pagination').value,
  totalItems: 0,
})

const emit = defineEmits<{
  /**
   * Emitted when page changes with filtered items
   * For internal pagination mode. Contains the items for the current page.
   * 
   * @param items - Array of items for the current page
   */
  filteredPage: [items: any[]]
  /**
   * Emitted when skip value changes
   * Useful for external pagination APIs. Indicates how many items to skip.
   * 
   * @param skip - Number of items to skip (0-based)
   */
  skip: [skip: number]
  /**
   * Emitted when page changes
   * Fired whenever the user navigates to a different page (1-based).
   * 
   * @param page - The new current page number (1-based)
   */
  'page-change': [page: number]
}>()

const currentPage = ref(1)
const show = ref(true)

const getTotalPages = computed((): Array<number> => {
  const totalItems = props.totalItems > 0 ? props.totalItems : props.list.length
  const totalPages = Math.max(1, Math.ceil(totalItems / props.pageSize))
  return Array.from({ length: totalPages }, (_, key) => key + 1)
})

const lastPage = computed((): number => {
  return getTotalPages.value.length
})

const emitList = (skipValue = 0) => {
  emit(
    'filteredPage',
    props.list.length > 0 ? props.list.slice(skipValue, skipValue + props.pageSize) : [],
  )
  emit('skip', props.skip > 0 ? props.skip : skipValue)
}

const handlePageChange = (event: Event, newPage: number) => {
  event.preventDefault()

  if (newPage === currentPage.value || newPage < 1 || newPage > lastPage.value) {
    return
  }

  const skipValue = props.pageSize * (newPage - 1)
  emitList(skipValue)
  currentPage.value = newPage
  emit('page-change', newPage)
}

const generatePages = (): FdsPaging[] => {
  const pages: FdsPaging[] = []
  const maxElements = props.maxElements
  const current = currentPage.value
  const last = lastPage.value

  // If we have 7 or fewer pages, show all
  if (last <= maxElements) {
    for (let i = 1; i <= last; i++) {
      pages.push({ index: i, dotted: false })
    }
    return pages
  }

  // Always show first page
  pages.push({ index: 1, dotted: false })

  // Calculate the range around current page
  let start = Math.max(2, current - 1)
  let end = Math.min(last - 1, current + 1)

  // Adjust range if current is near beginning
  if (current <= 3) {
    end = Math.min(last - 1, 4)
  }

  // Adjust range if current is near end
  if (current >= last - 2) {
    start = Math.max(2, last - 3)
  }

  // Add ellipsis before start if needed
  if (start > 2) {
    pages.push({ index: 0, dotted: true })
  }

  // Add middle pages
  for (let i = start; i <= end; i++) {
    pages.push({ index: i, dotted: false })
  }

  // Add ellipsis after end if needed
  if (end < last - 1) {
    pages.push({ index: 0, dotted: true })
  }

  // Always show last page (if not already shown)
  if (last > 1) {
    pages.push({ index: last, dotted: false })
  }

  return pages
}

watch(
  () => props.skip,
  () => {
    if (props.skip > 0) {
      currentPage.value = Math.floor(props.skip / props.pageSize) + 1
    } else {
      currentPage.value = 1
    }

    const totalItems = props.totalItems > 0 ? props.totalItems : props.list.length
    show.value = totalItems > props.pageSize
    emitList()
  },
  {
    immediate: true,
  },
)

// Watch for external changes to list or totalItems
watch(
  () => [props.list.length, props.totalItems, props.pageSize],
  () => {
    const totalItems = props.totalItems > 0 ? props.totalItems : props.list.length
    show.value = totalItems > props.pageSize

    // Reset to page 1 if current page is beyond total pages
    if (currentPage.value > lastPage.value) {
      currentPage.value = 1
      emitList()
    }
  },
)
</script>

<style scoped lang="scss"></style>
