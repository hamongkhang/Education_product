@extends('layouts.master')
<!-- Title content -->
@section('title')
    profile
@endsection
<!-- End Title -->

<!--Add Css -->
@push('css-profile')
<style>
 .css_button{
    float:right;
    width: 10%;
    margin-top: 3%;
 }
</style>
@endpush
<!-- End Css -->

<!-- Body content -->
@section('content')
    <!-- Content Header (Page header) -->
    <section class="content-header">
        <div class="container-fluid">
            <div class="row mb-2">
                <div class="col-sm-6">
                    <h1>Thông tin đơn vị</h1>
                </div>
                <div class="col-sm-6">
                    <ol class="breadcrumb float-sm-right">
                        <li class="breadcrumb-item"><a href="#">Home</a></li>
                        <li class="breadcrumb-item active">User Profile</li>
                    </ol>
                </div>
            </div>
        </div><!-- /.container-fluid -->
    </section>

    <!-- Main content -->
    <section class="content">
        <div class="container-fluid">
            <div class="row">
                <div class="col-md-3">

                    <!-- Profile Image -->
                    <div class="card card-primary card-outline">
                        <div class="card-body box-profile">
                            <div class="text-center">
                                <img class="profile-user-img img-fluid img-circle" src="../../dist/img/user4-128x128.jpg"
                                    style="width: 90%; height: 90%;" alt="User profile picture">
                            </div>
                            <a href="#" class="btn btn-primary btn-block" style="margin-top: 100px"><b>Thay đổi ảnh</b></a>
                        </div>
                        <!-- /.card-body -->
                    </div>
                    <!-- /.card -->
                </div>
                <!-- /.col -->
                <div class="col-md-9">

                    <div class="card">
                        <div class="card-header p-5">
                            <form action="#" method="">
                                <div class="form-group row">
                                    <label for="organization_name" class="col-sm-2 col-form-label">Tên đơn vị</label>
                                    <div class="col-sm-8">
                                        <input type="text" id='or_name' name='or_name' class="form-control" required>
                                    </div>
                                </div>

                                <div class="form-group row">
                                    <label for="address" class="col-sm-2 col-form-label">Địa chỉ</label>
                                    <div class="col-sm-8">
                                        <input type="text" id='address' name='address' class="form-control" required>
                                    </div>
                                </div>

                                <div class="form-group row">
                                    <label for="email" class="col-sm-2 col-form-label">Email</label>
                                    <div class="col-sm-8">
                                        <input type="email" id='email' name='email' class="form-control" required>
                                    </div>
                                </div>

                                <div class="form-group row">
                                    <label for="phone_number" class="col-sm-2 col-form-label">Số điện thoại</label>
                                    <div class="col-sm-8">
                                        <input type="text" id='phone_number' name='phone_number' class="form-control"
                                            required>
                                    </div>
                                </div>

                                <div class="form-group row">
                                    <label for="representative" class="col-sm-2 col-form-label">Người đại diện</label>
                                    <div class="col-sm-8">
                                        <input type="text" id='representative' name='representative' class="form-control"
                                            required>
                                    </div>
                                </div>

                                <div class="form-group row">
                                    <label for="position" class="col-sm-2 col-form-label">Chức vụ</label>
                                    <div class="col-sm-8">
                                        <input type="text" id='position' name='position' class="form-control"
                                            required>
                                    </div>
                                </div>

                                <div class="form-group row">
                                    <label for="note" class="col-sm-2 col-form-label">Ghi chú</label>
                                    <div class="col-sm-8">
                                        <input type="text" id='note' name='note' class="form-control"
                                            required>
                                    </div>
                                </div>
                                
                                <div class="row">
                                    <div class="col-sm-10" >
                                        <button type="button" class="btn btn-primary css_button">Lưu</button>
                                    </div>
                                </div>
                            </form>
                        </div><!-- /.card-header -->
                    </div>
                    <!-- /.card -->
                </div>
                <!-- /.col -->
            </div>
            <!-- /.row -->
        </div><!-- /.container-fluid -->
    </section>
    <!-- /.content -->
@endsection
<!-- End body-->

