<template>

    <div>

        <nav class="navbar navbar-dark sticky-top bg-dark flex-md-nowrap p-0 shadow">
            <a class="navbar-brand col-md-3 col-lg-2 mr-0 px-3" href="#">Company name</a>
            <button aria-controls="sidebarMenu" aria-expanded="false" aria-label="Toggle navigation"
                    class="navbar-toggler position-absolute d-md-none collapsed" data-target="#sidebarMenu"
                    data-toggle="collapse"
                    type="button">
                <span class="navbar-toggler-icon"></span>
            </button>
            <input aria-label="Search" class="form-control form-control-dark w-100" placeholder="Search" type="text">
            <ul class="navbar-nav px-3">
                <li class="nav-item text-nowrap">
                    <a class="nav-link" href="#">Sign out</a>
                </li>
            </ul>
        </nav>

    </div>


</template>

<script>
    export default {
        name: "Navbar"
    }
</script>

<style scoped>

</style>
