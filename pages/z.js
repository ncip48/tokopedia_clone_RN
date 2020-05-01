<SearchBar
        placeholder="cari produk..."
        onChangeText={this.updateSearch}
        value={search}
        round={true}
        lightTheme={true}
        showCancel={true}
        showLoading={this.state.showloadingsearch}
        containerStyle={{
            backgroundColor: 'transparent',
            margin: 0,
            padding: 0,
        }}
        inputContainerStyle={{
          backgroundColor: 'transparent',
        }}
        inputStyle={{
          color: '#000',
        }}
        onClear={this.clearSearch}
        placeholderTextColor={'#000'}
      />